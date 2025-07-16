import { useInitializeApp } from "./config/hooks/useInitializeApp";
import AuthRoutes from "./routes/auth";

const { app } = useInitializeApp();

app.use("/", AuthRoutes);
