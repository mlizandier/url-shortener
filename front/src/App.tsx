import "./index.css";

import UrlShortener from "./page/url-shortener";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient()

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UrlShortener />
    </QueryClientProvider>
  );
}

export default App;
