// Define the mock implementation functions
const mockOpenCamera = jest.fn().mockResolvedValue({
  path: 'mocked_camera_image_path',
  width: 300,
  height: 400,
  mime: 'image/jpeg',
});

const mockOpenPicker = jest.fn().mockResolvedValue({
  path: 'mocked_picker_image_path',
  width: 300,
  height: 400,
  mime: 'image/jpeg',
});

// Mock the module, providing the default export
jest.mock('react-native-image-crop-picker', () => ({
  __esModule: true, // Indicate it's an ES module mock
  // Define the default export as an object containing the methods
  default: {
    openCamera: mockOpenCamera,
    openPicker: mockOpenPicker,
  },
  // If needed, also export the methods as named exports (uncomment if necessary)
  // openCamera: mockOpenCamera,
  // openPicker: mockOpenPicker,
}));

// No need to export anything from the mock file itself
