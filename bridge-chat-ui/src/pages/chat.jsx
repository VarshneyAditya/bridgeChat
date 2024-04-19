import { Helmet } from 'react-helmet-async';

import { ChatView } from 'src/sections/chat';

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title> Chat </title>
      </Helmet>

      <ChatView />
    </>
  );
}
