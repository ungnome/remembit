import { pb } from '$lib/services/pocketbase';
import { redirect } from '@sveltejs/kit';

export default () => {
  if (!pb.authStore.isValid) {
    redirect(307, '/signin');
  }
};
