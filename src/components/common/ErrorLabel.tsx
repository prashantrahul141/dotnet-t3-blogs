const ErrorLabel = ({ message }: { message: string }) => {
  return <p className="text-destructive text-base">{message}</p>;
};

export default ErrorLabel;
