import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.slicingyouapp.app",
  appName: "slicing-youapp",
  webDir: "out",
  bundledWebRuntime: false,
  server: {
    url: "http://192.168.1.10:3000",
    cleartext: true,
  },
};

export default config;
