You have a couple options to bootstrap a WordPress backend that integrates with your decoupled frontend.

- Option #1 (recommended): cd into this `backend` folder and run:
```bash
composer create-project cloakwp-bedrock
```
This will bootstrap CloakWP's WordPress starter (based on the wonderful Bedrock boilerplate) into this project's `/backend` folder. It's built to integrate with the Inception frontend out-of-the-box, with essentially zero configuration. Once bootstrapped, follow the generated README from cloakwp-bedrock.
- Option #2: create your own WordPress installation separate from this project/repo, however you're used to doing so, and delete this `/backend` folder. Configure your WordPress intallation, including the installation of the CloakWP Plugin, to integrate with this frontend. 
