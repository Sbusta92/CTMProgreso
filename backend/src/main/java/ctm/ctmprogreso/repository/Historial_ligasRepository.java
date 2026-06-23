package ctm.ctmprogreso.repository;


import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import ctm.ctmprogreso.model.Historial_ligas;

public interface Historial_ligasRepository extends JpaRepository<Historial_ligas, Long> {
    Optional<Historial_ligas> findByNombreUsuarioAndDivision(String nombreUsuario, String division);
    List<Historial_ligas> findByNombreUsuario(String nombreUsuario);
}
