import { httpClient } from "@/utils/httpClient";
import { useEffect, useState } from "react";

export default function useMessage() {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);

  const fetchAllMessages = () => {
    setIsLoading(true);
    getMessages()
      .then((messages) => {
        setMessages(messages);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  const refetch = () => {
    fetchAllMessages();
  };

  useEffect(() => {
    fetchAllMessages();
  }, []);

  return { isLoading, messages, refetch };
}

const getMessages = async () => {
  return httpClient
    .get<{ message: string[] }>("/api/message")
    .then((res) => res.data)
    .then((data) => data.message);
};
