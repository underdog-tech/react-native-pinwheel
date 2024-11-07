import React from 'react';
import { StyleSheet, View } from 'react-native';
import Pinwheel from '@pinwheel/react-native-pinwheel/src/index';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InJlcXVpcmVkX2pvYnMiOlsiZGlyZWN0X2RlcG9zaXRfc3dpdGNoIl0sIm9yZ19uYW1lIjoiQksgQk5LIiwiYWxsb2NhdGlvbiI6eyJ0eXBlIjpudWxsLCJ2YWx1ZSI6bnVsbCwibWluX2Ftb3VudCI6bnVsbCwidGFyZ2V0cyI6W119LCJwbGF0Zm9ybV9rZXkiOm51bGwsInNraXBfaW50cm9fc2NyZWVuIjpmYWxzZSwic2tpcF9leGl0X3N1cnZleSI6ZmFsc2UsImVtcGxveWVyX2lkIjpudWxsLCJkaXNhYmxlX2RpcmVjdF9kZXBvc2l0X3NwbGl0dGluZyI6ZmFsc2UsInBsYXRmb3JtX2lkIjpudWxsLCJza2lwX2RlcG9zaXRfY29uZmlybWF0aW9uIjpudWxsLCJwbGF0Zm9ybV90eXBlIjpudWxsLCJsYW5ndWFnZSI6ImVuIiwiZW5kX3VzZXJfaWQiOiJkYTNmNTgwZi04OWQyLTRlNWYtODRmNi1hODFmYmQ3NjJiYzgiLCJhY2NvdW50X2lkIjpudWxsLCJkb2N1bWVudF91cGxvYWRzIjpudWxsLCJlbmFibGVfY2FyZF9zd2l0Y2giOmZhbHNlLCJzbWFydF9icmFuY2giOm51bGwsImVuYWJsZV91c2VyX2lucHV0X2JhbmtfaW5mbyI6ZmFsc2UsInRhZ3MiOm51bGwsImNvbXBhbnlfY29ubmVjdCI6bnVsbCwiZGVwb3NpdF9mb3JtcyI6ImRpc2FibGVkIiwiZW5kX3VzZXIiOnsicGxhdGZvcm1fbWF0Y2hpbmciOm51bGx9LCJoYXNfdXNlcl9hdXRoZW50aWNhdGlvbl9kYXRhIjpmYWxzZSwiaGFzX2Vucl9waWkiOmZhbHNlLCJlbmNyeXB0ZWRfanNvbiI6bnVsbCwiZW5jcnlwdGlvbl9lbnZlbG9wZSI6bnVsbCwiZW5hYmxlX2JpbGxfbmF2aWdhdG9yIjpmYWxzZSwiY2FyZHMiOm51bGwsIm1vZGUiOiJzYW5kYm94IiwiYXBpX2tleSI6ImFkYjNjMjgwMWZjNjc0OTQxYzMzYmExMTQ5ZGJkNTgwNjU3MmJiYzNiYzQ2ZmMyMTdlZmU4MmMxNjMyNDkxYmIiLCJ0b2tlbl9pZCI6IjQ1ZjVjMmJlLTlkZDMtNGYzOS1iZDY1LWFkYzVlNjA1ZDkzMCIsImpvYiI6ImRpcmVjdF9kZXBvc2l0X3N3aXRjaCIsIl91aWQiOiIwNzdjMzZhZi02OGRiLTQzOWUtYWVkZC1kYTBjZThkYmI3YTAiLCJ3b3Jrc3BhY2VfbmFtZSI6InJvYmJ5LXN0YWdpbmciLCJ3b3Jrc3BhY2VfdHlwZSI6ImNsaWVudCIsImhvbWVyX3VybCI6bnVsbH0sImlhdCI6MTczMDk1MTA2NiwiZXhwIjoxNzMwOTU0NjY2fQ.WE6LEeYgkHReWvxm6_VgtKI05n0bszj7efI7sYapJJM'; // existing token

export default function App(): JSX.Element {
  const handleEvent = (event: string, data: any): void => {
    console.log(event, data);
  };

  return (
    <View style={StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      }
    }).container}>
      <Pinwheel linkToken={token} onEvent={handleEvent}></Pinwheel>
    </View>
  );
}

// ... existing styles ... 