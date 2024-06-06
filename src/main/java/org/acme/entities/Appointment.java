package org.acme.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.ManyToOne;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@Entity
@Table(name = "appointments")
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @NotNull(message = "Paciente no puede ser vacio.")
    private Patient patient;

    @NotNull(message = "Día y fecha no puede ser vacios.")
    private LocalDateTime dateHour;

    @ManyToOne
    @NotNull(message = "Especialista no puede ser vacio.")
    private Doctor doctor;

    @NotNull(message = "Razon del turno no puede ser vacio.")
    private String queryReason;
}
