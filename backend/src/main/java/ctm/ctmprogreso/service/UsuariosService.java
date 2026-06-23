package ctm.ctmprogreso.service;

import ctm.ctmprogreso.dto.ResultadosDTO;
import ctm.ctmprogreso.dto.UsuariosDTO;
import ctm.ctmprogreso.model.Resultados;
import ctm.ctmprogreso.model.Usuarios;
import ctm.ctmprogreso.repository.UsuariosRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuariosService {

    @Autowired
    private FabricaUsuariosService fabricaUsuariosService;

    @Autowired
    private UsuariosRepository usuariosRepository;

    public UsuariosDTO save(UsuariosDTO usuariosDTO) {
        Usuarios usuarios = fabricaUsuariosService.crearUsuario(usuariosDTO);
        Usuarios savedUsuarios = usuariosRepository.save(usuarios);
        return fabricaUsuariosService.crearUsuarioDTO(savedUsuarios);
    }

    public List<UsuariosDTO> findAll() {
        List<Usuarios> usuarios = usuariosRepository.findAll();
        return fabricaUsuariosService.crearUsuarioDTOS(usuarios);
    }

    public UsuariosDTO findByID(int id) {
        Usuarios usuarios = usuariosRepository.findById(id).orElse(null);
        return fabricaUsuariosService.crearUsuarioDTO(usuarios);
    }

    public void deleteByID(Integer id) {
        usuariosRepository.deleteById(id);
    }

    public UsuariosDTO update(UsuariosDTO usuariosDTO) {

        Usuarios usuarios=fabricaUsuariosService.crearUsuario(usuariosDTO);
        Usuarios updateUsuarios = usuariosRepository.save(usuarios);
        return fabricaUsuariosService.crearUsuarioDTO(updateUsuarios);}

    public List<UsuariosDTO> findByNombreAndPassword(String nombre, String password) {
        return fabricaUsuariosService.crearUsuarioDTOS(usuariosRepository.findByNombreAndPassword(nombre, password));
    }

    public void activarUsuario(Integer id) {
        Usuarios usuario = usuariosRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        usuario.setActivo(!usuario.isActivo());
        usuariosRepository.save(usuario);
    }

    public void asignarDivision(Integer id, String division) {
        Usuarios usuario = usuariosRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        usuario.setDivisionActual(division);
        usuariosRepository.save(usuario);
    }

    public void resetearTodasLasDivisiones() {
        List<Usuarios> usuarios = usuariosRepository.findAll();
        for (Usuarios u : usuarios) {
            u.setDivisionActual(null);
        }
        usuariosRepository.saveAll(usuarios);
    }

    public void sumarLigaGanada(Integer id) {
        Usuarios usuario = usuariosRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        usuario.setLigas_ganadas(usuario.getLigas_ganadas() + 1);
        usuariosRepository.save(usuario);
    }


}


