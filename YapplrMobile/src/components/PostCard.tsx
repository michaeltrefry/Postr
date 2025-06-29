import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColors } from '../hooks/useThemeColors';
import { TimelineItem, Post } from '../types';
import ImageViewer from './ImageViewer';

interface PostCardProps {
  item: TimelineItem;
  onLike: (postId: number) => void;
  onRepost: (postId: number) => void;
  onUserPress?: (username: string) => void;
  onCommentPress?: (post: Post) => void;
  onCommentCountUpdate?: (postId: number, newCount: number) => void;
}

export default function PostCard({ item, onLike, onRepost, onUserPress, onCommentPress, onCommentCountUpdate }: PostCardProps) {
  const colors = useThemeColors();
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [showImageViewer, setShowImageViewer] = useState(false);

  const styles = createStyles(colors);

  // Helper function to generate image URL
  const getImageUrl = (fileName: string) => {
    if (!fileName) return '';
    return `http://192.168.254.181:5161/api/images/${fileName}`;
  };

  return (
    <View style={styles.postCard}>
      <View style={styles.postHeader}>
        <TouchableOpacity
          style={styles.userInfo}
          onPress={() => onUserPress?.(item.post.user.username)}
          activeOpacity={0.7}
        >
          <View style={styles.avatar}>
            {item.post.user.profileImageFileName ? (
              <Image
                source={{ uri: getImageUrl(item.post.user.profileImageFileName) }}
                style={styles.profileImage}
                onError={() => {
                  console.log('Failed to load profile image in timeline');
                }}
              />
            ) : (
              <Text style={styles.avatarText}>
                {item.post.user.username.charAt(0).toUpperCase()}
              </Text>
            )}
          </View>
          <View>
            <Text style={styles.username}>@{item.post.user.username}</Text>
            <Text style={styles.timestamp}>
              {new Date(item.post.createdAt).toLocaleDateString()}
            </Text>
          </View>
        </TouchableOpacity>
        {item.type === 'repost' && item.repostedBy && (
          <TouchableOpacity
            style={styles.repostBadge}
            onPress={() => onUserPress?.(item.repostedBy!.username)}
            activeOpacity={0.7}
          >
            <Ionicons name="repeat" size={14} color="#10B981" />
            <Text style={styles.repostText}>
              Reposted by @{item.repostedBy.username}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.postContent}>{item.post.content}</Text>

      {/* Image Display */}
      {item.post.imageUrl && (
        <View style={styles.imageContainer}>
          {!imageError ? (
            <>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => setShowImageViewer(true)}
              >
                <Image
                  source={{ uri: item.post.imageUrl }}
                  style={styles.postImage}
                  resizeMode="cover"
                  onLoad={() => {
                    console.log('Image loaded successfully:', item.post.imageUrl);
                    setImageLoading(false);
                  }}
                  onError={(error) => {
                    console.warn('Failed to load image:', item.post.imageUrl);
                    console.warn('Image error details:', error.nativeEvent.error);
                    setImageLoading(false);
                    setImageError(true);
                  }}
                  onLoadStart={() => {
                    console.log('Started loading image:', item.post.imageUrl);
                    setImageLoading(true);
                    setImageError(false);
                  }}
                />
              </TouchableOpacity>
              {imageLoading && (
                <View style={styles.imageLoadingOverlay}>
                  <ActivityIndicator size="large" color="#3B82F6" />
                </View>
              )}
            </>
          ) : (
            <View style={styles.imageErrorContainer}>
              <Text style={styles.imageErrorText}>Failed to load image</Text>
            </View>
          )}
        </View>
      )}

      <View style={styles.postActions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => onLike(item.post.id)}
        >
          <Ionicons
            name={item.post.isLikedByCurrentUser ? "heart" : "heart-outline"}
            size={20}
            color={item.post.isLikedByCurrentUser ? "#EF4444" : "#6B7280"}
          />
          <Text style={styles.actionText}>{item.post.likeCount}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => onCommentPress?.(item.post)}
        >
          <Ionicons name="chatbubble-outline" size={20} color="#6B7280" />
          <Text style={styles.actionText}>{item.post.commentCount}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => onRepost(item.post.id)}
        >
          <Ionicons
            name={item.post.isRepostedByCurrentUser ? "repeat" : "repeat-outline"}
            size={20}
            color={item.post.isRepostedByCurrentUser ? "#10B981" : "#6B7280"}
          />
          <Text style={styles.actionText}>{item.post.repostCount}</Text>
        </TouchableOpacity>
      </View>

      {/* Full-Screen Image Viewer */}
      {item.post.imageUrl && (
        <ImageViewer
          visible={showImageViewer}
          imageUrl={item.post.imageUrl}
          onClose={() => setShowImageViewer(false)}
        />
      )}
    </View>
  );
}

const createStyles = (colors: any) => StyleSheet.create({
  postCard: {
    backgroundColor: colors.card,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  postHeader: {
    marginBottom: 8,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    overflow: 'hidden',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  avatarText: {
    color: colors.primaryText,
    fontWeight: '600',
    fontSize: 16,
  },
  username: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  timestamp: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  repostBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  repostText: {
    fontSize: 12,
    color: colors.success,
    marginLeft: 4,
    fontWeight: '500',
  },
  postContent: {
    fontSize: 16,
    lineHeight: 22,
    color: colors.text,
    marginBottom: 12,
  },
  imageContainer: {
    marginBottom: 12,
    borderRadius: 12,
    overflow: 'hidden',
  },
  postImage: {
    width: '100%',
    height: 200,
    backgroundColor: colors.surface,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  actionText: {
    marginLeft: 6,
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  imageLoadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.background === '#FFFFFF' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(17, 24, 39, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageErrorContainer: {
    height: 200,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  imageErrorText: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: '500',
  },
});
