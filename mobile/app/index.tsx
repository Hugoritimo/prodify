import { Redirect } from "expo-router";

export default function Index() {
  // Mudamos de (tabs)/home para (auth)/signup
  // Assim o app abre direto na tela que você acabou de criar!
  return <Redirect href="/(auth)/signup" />;
}