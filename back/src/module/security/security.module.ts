import { Module } from "@nestjs/common";
import { HttpModule } from "../http/http.module";
import { UrlSafetyService } from "./url-safety/url-safety.service";

@Module({
	imports: [HttpModule],
	providers: [UrlSafetyService],
	exports: [UrlSafetyService],
})
export class SecurityModule { }