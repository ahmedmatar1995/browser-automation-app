import { OrganizationList } from '@clerk/tanstack-react-start';
import { auth } from '@clerk/tanstack-react-start/server';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';

const authStateFn = createServerFn({ method: 'GET' }).handler(async () => {
  const { isAuthenticated } = await auth();

  if (!isAuthenticated) {
    throw redirect({ to: '/sign-in' });
  }
});

export const Route = createFileRoute('/(auth)/choose-organization')({
  beforeLoad: async () => {
    await authStateFn();
  },
  component: Organizations,
});

function Organizations() {
  return (
    <div className="h-screen flex items-center justify-center">
      <section>
        <OrganizationList
          hidePersonal
          afterCreateOrganizationUrl="/"
          afterSelectOrganizationUrl="/"
        />
      </section>
    </div>
  );
}
