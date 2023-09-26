function MessageList({ children }: { children: React.ReactNode }) {
  return <div className="overflow-auto flex flex-col flex-1 pt-4">{children}</div>;
}

export default MessageList;
