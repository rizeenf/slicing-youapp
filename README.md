# Take Home Test Project Documentation

This project is a take-home test application that includes login, register, and profile pages based on the Figma design.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Usage for emulator](#usage-for-emulator)

## Technologies Used

- [Next.js](https://nextjs.org/): React framework for building web applications.
- [Capacitor](https://capacitorjs.com/): Cross-platform app runtime used for mobile deployment.
- [Tailwind CSS](https://tailwindcss.com/): CSS framework for styling.
- [Shadcn/ui](https://ui.shadcn.com/): Component library for Tailwind.

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/rizeenf/slicing-youapp.git

   cd slicing-youapp

   npm install
   # or
   yarn
   

   npx cap sync


   npm run dev
   # or
   yarn dev

   ```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.



## Or you can simply visit this page 
Open [https://slicing-youapp.vercel.app/](https://slicing-youapp.vercel.app/) with your browser.





## Project Structure
The project is organized as follows:

- app/: Next.js pages app router.
- components/: Reusable React components.
- public/: Static assets.
- hooks/: Custom hooks.
- types/: Types for typescript.
- utils/: Utility


## Usage for Emulator

After installing dependencies, you can run in your own emulator.

   ```bash
   npm run static
   # or
   yarn static


   npx cap add android  //for android emulator
   # or
   npx cap add ios      //for ios emulator


   npx cap open android
   # or
   npx cap open ios

   # please make sure you already install
    - Android Studio (For Android Emulator)
    - Xcode (For Ios Emulator)
   ```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
