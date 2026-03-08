import { useInitializeApp } from "./config/hooks/useInitializeApp";
import AuthRoutes from "./router/auth";
import PlaylistRoutes from "./router/playlists";

const { app } = useInitializeApp();

app.use("/auth", AuthRoutes);
app.use("/playlists", PlaylistRoutes);
