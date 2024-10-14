import { AppModule } from "./app.module";
import { appBootstrapLoader } from "./common/loaders/app-bootstrap.loader";

appBootstrapLoader(AppModule, { enabled: true, config: { version: '1.0.0' } });
