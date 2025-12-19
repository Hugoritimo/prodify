import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react"; 
import { AuthProvider, useAuth } from "../src/contexts/AuthContext";

function RootLayoutNav() {
  const { signed } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const [isReady, setIsReady] = useState(false); // Novo estado para controle

  
  useEffect(() => {
    setIsReady(true);
  }, []);

  
  useEffect(() => {
    if (!isReady) return; 

    const inAuthGroup = segments[0] === "(auth)";

    if (!signed && !inAuthGroup) {
      router.replace("/(auth)/signup");
    } else if (signed && inAuthGroup) {
      router.replace("/(tabs)/home");
    }
  }, [signed, segments, isReady]);

  return (
  
<Stack screenOptions={{ headerShown: false }}>
  <Stack.Screen name="index" />
  <Stack.Screen name="(auth)/signup" />
  <Stack.Screen name="(auth)/login" /> 
  <Stack.Screen name="(tabs)" />
</Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}