import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { blogUpdated, blogDeleted, commentAddedOrUpdated, commentDeleted } from '../redux/slices/blogSlice';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

export const useBlogWebSocket = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const client = new Client({
            webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
            debug: (str) => {
                // console.log(str);
            },
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
        });

        client.onConnect = () => {
            // Subscribe to generic blog updates
            client.subscribe('/topic/blogs', (message) => {
                const updatedBlog = JSON.parse(message.body);
                dispatch(blogUpdated(updatedBlog));
            });
            client.subscribe('/topic/blogs/delete', (message) => {
                const blogId = JSON.parse(message.body);
                dispatch(blogDeleted(blogId));
            });

            // Comments
            client.subscribe('/topic/comments', (message) => {
                const comment = JSON.parse(message.body);
                dispatch(commentAddedOrUpdated(comment));
            });
            client.subscribe('/topic/comments/delete', (message) => {
                const commentId = JSON.parse(message.body);
                dispatch(commentDeleted(commentId));
            });
            client.subscribe('/topic/comments/reaction', (message) => {
                const comment = JSON.parse(message.body);
                dispatch(commentAddedOrUpdated(comment));
            });
        };

        client.activate();

        return () => {
            if (client.active) {
                client.deactivate();
            }
        };
    }, [dispatch]);
};
