export interface WelcomeEmailProps {
  name: string;
}

export default function WelcomeEmail({ name }: WelcomeEmailProps) {
  return (
    <div>
      <h1>Welcome, {name}!</h1>
    </div>
  );
}
