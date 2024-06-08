package org.acme.resources;

import org.acme.domain.Doctor;
import org.acme.services.DoctorService;

import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("/especialistas")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class DoctorResource {

    @Inject
    DoctorService service;

    @GET
    public List<Doctor> getAll() {
        return service.getAll();
    }

    @GET
    @Path("/{id}")
    public Response getById(@PathParam("id") Long id) {
        Doctor doctor = service.getById(id);
        if (doctor == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.ok(doctor).build();
    }

    @POST
    public Response create(Doctor doctor) {
        try {
            Doctor createdDoctor = service.create(doctor);
            return Response.status(Response.Status.CREATED).entity(createdDoctor).build();
        } catch (Exception e) {
            return Response.status(Response.Status.BAD_REQUEST).entity(e.getMessage()).build();
        }    
    }

    @PUT
    @Path("/{id}")
    public Response update(@PathParam("id") Long id, Doctor doctor) {
        Doctor updatedDoctor = service.update(id, doctor);
        if (updatedDoctor == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.ok(updatedDoctor).build();
    }

    @DELETE
    @Path("/{id}")
    public Response delete(@PathParam("id") Long id) {
        if (service.delete(id)) {
            return Response.status(Response.Status.NO_CONTENT).build();
        }
        return Response.status(Response.Status.NOT_FOUND).build();
    }
}
