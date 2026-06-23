package ctm.ctmprogreso.repository;


import ctm.ctmprogreso.model.Usuarios;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UsuariosRepository extends JpaRepository<Usuarios, Integer> {

    List<Usuarios> findByNombreAndPassword(String nombre, String password);
    Optional<Usuarios> findByNombre(String nombre); // ← Añade este método
}


