package ctm.ctmprogreso.service;

import ctm.ctmprogreso.dto.ResultadosDTO;
import ctm.ctmprogreso.model.Resultados;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class FabricaResultadosService {

    public Resultados crearResultados(ResultadosDTO resultadosDTO) {
        return new Resultados(resultadosDTO);
    }

    public ResultadosDTO crearResultadosDTO(Resultados resultados) {
        return new ResultadosDTO(resultados);
    }

    public List<ResultadosDTO> crearResultadosDTOS(List<Resultados> resultados) {
        List<ResultadosDTO> resultadosDTO = new ArrayList<>();
        resultados.stream().forEach(
                resultado -> {
                    resultadosDTO.add(crearResultadosDTO(resultado));
                }
        );
        return resultadosDTO;
    }
}




