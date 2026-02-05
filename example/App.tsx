import {useCallback, useState} from 'react';
import Pinwheel from '@pinwheel/react-native-pinwheel';
import {Button, StyleSheet, View} from 'react-native';
import API_SECRET from './env';

export default function App() {
  const handleEvent = (event: string, data: any): void => {
    if (event === 'exit') {
      setLinkToken(null);
    }
    console.log(event, data);
  };

  const [linkToken, setLinkToken] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateLinkToken = useCallback(async () => {
    if (!API_SECRET || API_SECRET === 'YOUR_SANDBOX_API_SECRET') {
      console.log('Set your API secret in env.ts');
      return;
    }

    setIsGenerating(true);

    try {
      const response = await fetch(
        'https://sandbox.getpinwheel.com/v1/link_tokens',
        {
          method: 'POST',
          headers: {
            'X-API-SECRET': API_SECRET,
            'Content-Type': 'application/json',
            'Pinwheel-Version': '2025-07-08',
          },
          body: JSON.stringify({
            allocation: {
              targets: [
                {
                  account_number: '000000000',
                  routing_number: '000000000',
                  type: 'checking',
                  name: 'wefwef',
                },
              ],
              value: 900,
            },
            disable_direct_deposit_splitting: false,
            enable_self_id: false,
            features: ['direct_deposit_switch'],
            language: 'en',
            skip_intro_screen: false,
            solution: 'Deposit Switch',
            org_name: 'ttt',
            end_user_id: 'ttt',
          }),
        },
      );
      const json = await response.json();
      const token: string | undefined = json?.token ?? json?.data?.token;
      if (token) {
        setLinkToken(token);
      } else {
        console.log('Unexpected response creating link token:', json);
      }
    } catch (err) {
      console.log('Failed to create link token', err);
    } finally {
      setIsGenerating(false);
    }
  }, []);

  return (
    <View style={styles.container}>
      {linkToken ? (
        <Pinwheel linkToken={linkToken} onEvent={handleEvent} useSecureOrigin />
      ) : (
        <Button
          title={isGenerating ? 'Generating…' : 'Generate Link Token'}
          onPress={generateLinkToken}
          disabled={isGenerating}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
    gap: 10,
    backgroundColor: '#eeeeFF',
  },
});
