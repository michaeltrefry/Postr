'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { messageApi } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';

interface MessagesListProps {
  conversationId: number;
}

export default function MessagesList({ conversationId }: MessagesListProps) {
  const { user } = useAuth();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['messages', conversationId],
    queryFn: ({ pageParam = 1 }) => messageApi.getMessages(conversationId, pageParam, 25),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < 25) {
        return undefined;
      }
      return allPages.length + 1;
    },
    initialPageParam: 1,
    enabled: !!conversationId,
    refetchInterval: 5000, // Refresh every 5 seconds for active conversations
    refetchIntervalInBackground: false,
  });

  // Scroll to bottom on initial load and new messages
  useEffect(() => {
    if (data && !isFetchingNextPage) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [data, isFetchingNextPage]);

  // Intersection Observer for infinite scroll (load older messages)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '100px',
      }
    );

    const currentRef = loadMoreRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-gray-500">Loading messages...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-red-500">Failed to load messages</div>
      </div>
    );
  }

  const messages = data?.pages.flat() || [];

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center text-gray-500">
          <p className="text-lg mb-2">No messages yet</p>
          <p className="text-sm">Start the conversation!</p>
        </div>
      </div>
    );
  }

  // Reverse messages to show oldest first (since we're loading newest first from API)
  const sortedMessages = [...messages].reverse();

  return (
    <div className="flex-1 overflow-y-auto">
      {/* Load more trigger at top */}
      {hasNextPage && (
        <div ref={loadMoreRef} className="h-12 flex items-center justify-center">
          {isFetchingNextPage ? (
            <div className="text-gray-500 text-sm">Loading older messages...</div>
          ) : (
            <div className="text-gray-400 text-sm">Scroll up for older messages</div>
          )}
        </div>
      )}

      {/* Messages */}
      <div className="p-4 space-y-4">
        {sortedMessages.map((message, index) => {
          const isCurrentUser = message.sender.id === user?.id;
          const previousMessage = sortedMessages[index - 1];
          const showAvatar = !previousMessage || previousMessage.sender.id !== message.sender.id;
          
          return (
            <MessageBubble
              key={message.id}
              message={message}
              isCurrentUser={isCurrentUser}
              showAvatar={showAvatar}
            />
          );
        })}
      </div>

      {/* Scroll anchor */}
      <div ref={messagesEndRef} />
    </div>
  );
}
