package ctm.ctmprogreso;
/*
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@EnableWebSecurity
@Configuration
public class Security {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity.authorizeHttpRequests(
                authorizationManagerRequestMatcherRegistry -> {
                    authorizationManagerRequestMatcherRegistry
                            .requestMatchers(HttpMethod.GET, "/CTMProgreso/v1/Divisiones", "/CTMProgreso/v2/Usuario", "/CTMProgreso/v3/Partidos", "/CTMProgreso/v4/Resultados")
                            .authenticated();
                    authorizationManagerRequestMatcherRegistry
                            .requestMatchers(HttpMethod.POST, "/CTMProgreso/v1/Divisiones", "/CTMProgreso/v2/Usuario", "/CTMProgreso/v3/Partidos", "/CTMProgreso/v4/Resultados")
                            .denyAll();
                    authorizationManagerRequestMatcherRegistry.anyRequest().authenticated();
                    authorizationManagerRequestMatcherRegistry.anyRequest().permitAll();
                }
        ).build();
    }
}

*/