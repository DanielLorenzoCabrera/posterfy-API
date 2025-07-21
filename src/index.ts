import { useInitializeApp } from "./config/hooks/useInitializeApp";
import AuthRoutes from "./router/auth";

const { app } = useInitializeApp();

app.use("/", AuthRoutes);
