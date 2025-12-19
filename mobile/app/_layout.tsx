import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react"; // Adicionamos o useState
import { AuthProvider, useAuth } from "../src/contexts/AuthContext";

function RootLayoutNav() {
  const { signed } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const [isReady, setIsReady] = useState(false); // Novo estado para controle

  // 1. Primeiro useEffect para garantir que o Layout montou
  useEffect(() => {
    setIsReady(true);
  }, []);

  // 2. Segundo useEffect para a lógica de navegação
  useEffect(() => {
    if (!isReady) return; // Só executa se o componente já estiver montado

    const inAuthGroup = segments[0] === "(auth)";

    if (!signed && !inAuthGroup) {
      router.replace("/(auth)/signup");
    } else if (signed && inAuthGroup) {
      router.replace("/(tabs)/home");
    }
  }, [signed, segments, isReady]);

  return (
   // Dentro do seu Stack no RootLayoutNav
<Stack screenOptions={{ headerShown: false }}>
  <Stack.Screen name="index" />
  <Stack.Screen name="(auth)/signup" />
  <Stack.Screen name="(auth)/login" /> {/* Adicione esta linha */}
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