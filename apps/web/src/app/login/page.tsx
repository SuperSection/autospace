import { LoginForm } from '@autospace/ui/src/components/templates/LoginForm';
import { AuthLayout } from '@autospace/ui/src/components/molecules/AuthLayout';

export default function LoginPage() {
  return (
    <AuthLayout title="Login">
      <LoginForm />
    </AuthLayout>
  );
}
