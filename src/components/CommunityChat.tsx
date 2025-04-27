import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, Flag, Trash2, Users } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';

interface ChatMessage {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  nickname: string;
  reported: boolean;
}

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const CommunityChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [nickname, setNickname] = useState('');
  const [userId] = useState(() => localStorage.getItem('chat_user_id') || uuidv4());
  const [showNicknameModal, setShowNicknameModal] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [onlineCount, setOnlineCount] = useState(0);

  useEffect(() => {
    // Save user ID
    localStorage.setItem('chat_user_id', userId);

    // Load nickname if exists
    const savedNickname = localStorage.getItem('chat_nickname');
    if (savedNickname) {
      setNickname(savedNickname);
    } else {
      setShowNicknameModal(true);
    }

    // Subscribe to new messages
    const channel = supabase
      .channel('chat_messages')
      .on('presence', { event: 'sync' }, () => {
        const presenceState = channel.presenceState();
        setOnlineCount(Object.keys(presenceState).length);
      })
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
        },
        (payload) => {
          setMessages((prev) => [...prev, payload.new as ChatMessage]);
        }
      )
      .subscribe();

    // Track online presence
    const trackPresence = async () => {
      await channel.track({ user_id: userId });
    };
    trackPresence();

    // Load existing messages
    loadMessages();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadMessages = async () => {
    const { data } = await supabase
      .from('chat_messages')
      .select('*')
      .order('created_at', { ascending: true })
      .limit(50);

    if (data) {
      setMessages(data);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !nickname) return;

    const message = {
      content: newMessage.trim(),
      user_id: userId,
      nickname
    };

    const { error } = await supabase
      .from('chat_messages')
      .insert([message]);

    if (!error) {
      setNewMessage('');
    }
  };

  const handleReportMessage = async (messageId: string) => {
    await supabase.rpc('report_message', { message_id: messageId });
    // loadMessages(); // Reload messages to reflect changes
  };

  const handleDeleteMessage = async (messageId: string) => {
    await supabase
      .from('chat_messages')
      .delete()
      .eq('id', messageId)
      .eq('user_id', userId);
    
    setMessages(prev => prev.filter(msg => msg.id !== messageId));
  };

  const saveNickname = (name: string) => {
    const sanitizedName = name.trim();
    if (sanitizedName) {
      setNickname(sanitizedName);
      localStorage.setItem('chat_nickname', sanitizedName);
      setShowNicknameModal(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-6 h-6 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-800">Community Chat</h3>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Users className="w-4 h-4" />
          <span>{onlineCount} online</span>
        </div>
      </div>

      {/* Messages */}
      <div className="h-96 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start gap-3 ${
              message.user_id === userId ? 'flex-row-reverse' : ''
            }`}
          >
            <div
              className={`
                flex-1 max-w-[80%] p-3 rounded-lg
                ${message.user_id === userId
                  ? 'bg-blue-50 text-blue-900'
                  : 'bg-gray-50 text-gray-900'}
              `}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">{message.nickname}</span>
                <span className="text-xs text-gray-500">
                  {new Date(message.created_at).toLocaleTimeString()}
                </span>
              </div>
              <p className="text-sm">{message.content}</p>
              
              {/* Message Actions */}
              <div className={`flex gap-2 mt-2 text-xs ${
                message.user_id === userId ? 'justify-start' : 'justify-end'
              }`}>
                {message.user_id === userId ? (
                  <button
                    onClick={() => handleDeleteMessage(message.id)}
                    className="text-red-600 hover:text-red-700 flex items-center gap-1"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                ) : (
                  <button
                    onClick={() => handleReportMessage(message.id)}
                    className="text-orange-600 hover:text-orange-700 flex items-center gap-1"
                    disabled={message.reported}
                  >
                    <Flag className="w-4 h-4" />
                    {message.reported ? 'Reported' : 'Report'}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <form onSubmit={handleSendMessage} className="p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 rounded-lg border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
          />
          <button
            type="submit"
            disabled={!newMessage.trim() || !nickname}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>

      {/* Nickname Modal */}
      {showNicknameModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Choose a Nickname</h3>
            <input
              type="text"
              placeholder="Enter your nickname"
              className="w-full rounded-lg border-gray-300 mb-4"
              onChange={(e) => setNickname(e.target.value)}
              value={nickname}
            />
            <button
              onClick={() => saveNickname(nickname)}
              disabled={!nickname.trim()}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              Start Chatting
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityChat;