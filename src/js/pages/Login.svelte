<style>

</style>

<script>
  // -----------------------------------------------
  // Imports
  // -----------------------------------------------

  import { auth, googleProvider } from '../utils/firebase';
  import { user } from '../utils/store.js';

  // -----------------------------------------------
  // Methods
  // -----------------------------------------------

  async function login() {
    try {
      const result = await auth.signInWithPopup(googleProvider);

      if (result.user) {
        const { photoURL, displayName, email } = result.user;

        user.set({
          ...$user,
          logged: true,
          photoURL,
          displayName,
          email,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
</script>

<main>
  <button on:click="{login}">Login with Google</button>
</main>
