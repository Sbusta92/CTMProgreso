package ctm.ctmprogreso.service;


import java.util.List;
import java.util.Optional;

import ctm.ctmprogreso.repository.UsuariosRepository;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ctm.ctmprogreso.model.Historial_ligas;
import ctm.ctmprogreso.repository.Historial_ligasRepository;

@Service


public class Historial_ligasService {
    @Autowired
    private Historial_ligasRepository historialLigasRepository;

    @Getter
    @Setter
    @Autowired
    private UsuariosRepository usuariosRepository;

    public void incrementarVictorias(String nombreUsuario, String division) {
        Optional<Historial_ligas> historialOpt = historialLigasRepository.findByNombreUsuarioAndDivision(nombreUsuario, division);

        if (historialOpt.isPresent()) {
            Historial_ligas historial = historialOpt.get();
            historial.setVictorias(historial.getVictorias() + 1);
            historialLigasRepository.save(historial);
        } else {
            Historial_ligas nuevoHistorial = new Historial_ligas();
            nuevoHistorial.setNombreUsuario(nombreUsuario);
            nuevoHistorial.setDivision(division);
            nuevoHistorial.setVictorias(1);
            historialLigasRepository.save(nuevoHistorial);
        }

        // 👇 Solo si ha ganado en Primera, aumentar su contador ligas_ganadas
        if ("Primera".equalsIgnoreCase(division)) {
            usuariosRepository.findByNombre(nombreUsuario).ifPresent(usuario -> {
                usuario.setLigas_ganadas(usuario.getLigas_ganadas() + 1);
                usuariosRepository.save(usuario);
            });
        }
    }

    public List<Historial_ligas> obtenerHistorialPorUsuario(String nombreUsuario) {
        return historialLigasRepository.findByNombreUsuario(nombreUsuario);
    }

    public List<Historial_ligas> obtenerHistorialCompleto() {
        return historialLigasRepository.findAll();
    }



}

