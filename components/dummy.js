import { Share, Button } from 'react-native';

const ShareExample = () => {
  const shareContent = () => {
    Share.share({
      message: 'Check out this awesome content!',
      url: 'https://www.example.com',
      title: 'Awesome Content Title'
    });
  };

  return (
    <Button
      onPress={shareContent}
      title="Share Content"
    />
  );
};

export default ShareExample;
