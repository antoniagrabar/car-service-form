# Car Service App

**Car Service App** is a service configuration tool built with Next.js, TypeScript, and Tailwind CSS. The main purpose of this app is to create a configurator for selecting services and scheduling car service appointments. The configurator consists of a wizard where users can fill in required information to complete their booking.

## Technologies Used

- **Next.js 15**: Enhances performance and SEO with server-side rendering and static generation.
- **TypeScript**: Ensures type safety and improves code maintainability.
- **Tailwind CSS**: Provides a fast and responsive design framework.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js
- npm or yarn

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/antoniagrabar/car-service-app.git
    ```

2. Navigate to the project directory:
    ```bash
    cd car-service-app
    ```

3. Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

4. Set up environment variables by creating a `.env` file based on `.env-example`:
    ```bash
    cp .env-example .env
    ```
    
5. Open `.env` and fill in the required values:

    ```plaintext
    BACKEND_URL=YOUR_BACKEND_API_URL
    AUTH_TOKEN=YOUR_AUTH_TOKEN
    ```

   - `BACKEND_URL`: The URL of the backend API the app will connect to.
   - `AUTH_TOKEN`: Your authentication token for API access.

5. Start the development server:
    ```bash
    npm run dev
    # or
    yarn dev
    ```

6. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.



