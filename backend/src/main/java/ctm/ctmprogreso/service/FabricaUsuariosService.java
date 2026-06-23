package ctm.ctmprogreso.service;

import ctm.ctmprogreso.dto.UsuariosDTO;
import ctm.ctmprogreso.model.Usuarios;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class FabricaUsuariosService {

    public Usuarios crearUsuario(UsuariosDTO usuariosDTO) {
        return new Usuarios(usuariosDTO);
    }

    public UsuariosDTO crearUsuarioDTO(Usuarios usuarios) {
        return new UsuariosDTO(usuarios);
    }

    public List<UsuariosDTO> crearUsuarioDTOS(List<Usuarios> usuarios) {
        List<UsuariosDTO> usuariosDTO = new ArrayList<>();
        usuarios.stream().forEach(
                usuario -> {
                    usuariosDTO.add(crearUsuarioDTO(usuario));
                }
        );
        return usuariosDTO;
    }

}



