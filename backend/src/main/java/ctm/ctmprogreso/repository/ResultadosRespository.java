package ctm.ctmprogreso.repository;

import ctm.ctmprogreso.model.Resultados;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository

public interface ResultadosRespository extends JpaRepository<Resultados, Integer> {
}
