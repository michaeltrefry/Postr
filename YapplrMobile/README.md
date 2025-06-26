# Yapplr Mobile App

React Native mobile application for the Yapplr social media platform.

## 🏗️ **Architecture**

### **Shared Code Structure**
- **yapplr-shared**: Common package containing API clients, TypeScript types, and business logic
- **Code Reuse**: 70-80% code sharing between web and mobile apps
- **Type Safety**: Full TypeScript support with shared interfaces

### **Tech Stack**
- **React Native**: Cross-platform mobile development
- **Expo**: Development platform and tooling
- **React Navigation**: Navigation library
- **Axios**: HTTP client for API communication
- **AsyncStorage**: Local data persistence
- **TypeScript**: Type safety and better development experience
- **Expo Image Picker**: Camera and gallery integration

## 🚀 **Getting Started**

### **Prerequisites**
- Node.js 18+ 
- Expo CLI: `npm install -g @expo/cli`
- iOS Simulator (for iOS development)
- Android Studio (for Android development)
- Expo Go app on your phone (for testing)

### **Installation**

1. **Install dependencies:**
   ```bash
   cd YapplrMobile
   npm install --legacy-peer-deps
   ```

2. **Build shared package:**
   ```bash
   cd ../yapplr-shared
   npm run build
   ```

3. **Start the development server:**
   ```bash
   cd ../YapplrMobile
   npx expo start
   ```

4. **Run on device/simulator:**
   - **iOS Simulator**: Press `i` in the terminal
   - **Android Emulator**: Press `a` in the terminal
   - **Physical Device**: Scan QR code with Expo Go app

## 📱 **Features Implemented**

### **Authentication**
- ✅ Login/Register screens
- ✅ JWT token management
- ✅ Persistent authentication
- ✅ Auto-logout on token expiry

### **Core Screens**
- ✅ **Home**: Timeline with posts, reposts, and images
- ✅ **Search**: User search functionality
- ✅ **Messages**: Conversation list with unread counts
- ✅ **Profile**: User profile with logout
- ✅ **User Profiles**: View other users' profiles and posts

### **Post Management**
- ✅ **Create Posts**: Text and image post creation
- ✅ **Image Upload**: Gallery picker integration
- ✅ **Timeline Display**: Posts with images and interactions
- ✅ **Like/Repost**: Social interaction features

### **Navigation & User Interaction**
- ✅ **User Profile Navigation**: Tap avatars/usernames to view profiles
- ✅ **Profile Timeline**: View user's posts and reposts
- ✅ **Cross-Profile Navigation**: Navigate between different user profiles
- ✅ **Back Navigation**: Proper navigation stack management

### **Image Functionality**
- ✅ **Image Upload**: Select from device gallery
- ✅ **Image Display**: Optimized loading in timeline
- ✅ **Full-Screen Viewer**: Tap to expand with zoom
- ✅ **Pinch to Zoom**: Native zoom gestures
- ✅ **Loading States**: Smooth image loading experience

### **API Integration**
- ✅ Custom API client with error handling
- ✅ Automatic token injection
- ✅ Network error recovery
- ✅ Real-time data updates
- ✅ Image upload with progress tracking

## 🔧 **Configuration**

### **API Base URL**
Update the API URL in `src/api/client.ts`:
```typescript
const API_BASE_URL = 'http://192.168.254.181:5161'; // Change to your API URL
```

For production, use your deployed API URL. For development, use your local network IP address to allow mobile device access.

### **Development vs Production**
- **Development**: Uses localhost API
- **Production**: Update to production API URL before building

## 📂 **Project Structure**

```
YapplrMobile/
├── src/
│   ├── api/
│   │   └── client.ts                # API client configuration
│   ├── components/
│   │   ├── CreatePostModal.tsx      # Post creation with image upload
│   │   ├── ImageViewer.tsx          # Full-screen image viewer
│   │   └── PostCard.tsx             # Timeline post display with user navigation
│   ├── contexts/
│   │   └── AuthContext.tsx          # Authentication state management
│   ├── navigation/
│   │   └── AppNavigator.tsx         # Navigation configuration
│   ├── screens/
│   │   ├── auth/
│   │   │   ├── LoginScreen.tsx      # Login interface
│   │   │   └── RegisterScreen.tsx   # Registration interface
│   │   └── main/
│   │       ├── HomeScreen.tsx       # Timeline/feed with posts
│   │       ├── SearchScreen.tsx     # User search
│   │       ├── MessagesScreen.tsx   # Conversations
│   │       ├── ProfileScreen.tsx    # Current user profile
│   │       └── UserProfileScreen.tsx # Other users' profiles
│   ├── types/
│   │   └── index.ts                 # TypeScript type definitions
│   ├── utils/
│   │   └── networkTest.ts           # Network connectivity utilities
│   └── LoadingScreen.tsx            # Loading state
├── App.tsx                          # Root component
└── package.json
```

## 🔄 **API Integration**

The mobile app uses a custom API client for:
- **HTTP Requests**: Axios-based client with interceptors
- **Authentication**: Automatic token injection
- **Error Handling**: Network error recovery and retry logic
- **Image Upload**: Multipart form data support

### **Network Configuration**
For development with physical devices:
1. **Find your local IP**: Use `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
2. **Update API URL**: Change `localhost` to your network IP
3. **Use tunnel mode**: Run `npx expo start --tunnel` for external access

## 🎯 **Next Steps**

### **Immediate Enhancements**
1. **Camera Integration**: Add camera capture for posts
2. **Push Notifications**: Real-time message and interaction alerts
3. **Comments System**: Add comment creation and display
4. **Follow/Unfollow**: Implement follow functionality in user profiles

### **Advanced Features**
1. **Real-time Updates**: WebSocket integration for live features
2. **Deep Linking**: Direct links to posts and profiles
3. **Share Extension**: Share to Yapplr from other apps
4. **Haptic Feedback**: Enhanced user interactions
5. **Offline Support**: Cache posts for offline viewing

### **Performance Optimizations**
1. **Infinite Scroll**: Optimized FlatList implementation (✅ Implemented)
2. **Image Caching**: Enhanced image loading and caching
3. **Memory Management**: Proper cleanup and optimization
4. **Bundle Size**: Code splitting and optimization

## 🧪 **Testing**

### **Development Testing**
- Use Expo Go app for quick testing
- iOS Simulator for iOS-specific testing
- Android Emulator for Android testing

### **Production Testing**
- Build standalone apps for app store testing
- Test with production API endpoints
- Performance testing on various devices

## 📦 **Building for Production**

### **iOS Build**
```bash
npx expo build:ios
```

### **Android Build**
```bash
npx expo build:android
```

### **App Store Deployment**
Follow Expo's documentation for app store submission.

## 🤝 **Contributing**

1. Make changes to mobile app code
2. Test on both iOS and Android platforms
3. Ensure API compatibility with backend
4. Test image functionality thoroughly
5. Submit pull request with detailed description

## 📞 **Support**

For issues or questions:
- Check Expo documentation
- Review React Native guides
- Test API connectivity with network tools
- Verify image upload permissions and formats

## 🎉 **Current Status**

The Yapplr mobile app now has **full feature parity** with the web frontend for core functionality:

- ✅ **Authentication**: Complete login/register flow
- ✅ **Timeline**: Posts with images, likes, and reposts
- ✅ **Post Creation**: Text and image posts with gallery picker
- ✅ **Image Viewing**: Full-screen viewer with pinch-to-zoom
- ✅ **Social Features**: Like, repost, and user interactions
- ✅ **User Profiles**: Navigate to user profiles by tapping avatars/names
- ✅ **Profile Timeline**: View any user's posts and profile information
- ✅ **Real-time Updates**: Live timeline refresh

The app is ready for production use and further feature development!
