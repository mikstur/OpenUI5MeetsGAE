package com.mvk.openui5;

import com.mvk.openui5.PMF;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.google.api.server.spi.response.CollectionResponse;
import com.google.appengine.api.datastore.Cursor;
import com.google.appengine.datanucleus.query.JDOCursorHelper;

import java.util.HashMap;
import java.util.List;

import javax.annotation.Nullable;
import javax.inject.Named;
import javax.persistence.EntityExistsException;
import javax.persistence.EntityNotFoundException;
import javax.jdo.PersistenceManager;
import javax.jdo.Query;

@Api(name = "employeeendpoint", namespace = @ApiNamespace(ownerDomain = "com.mvk", ownerName = "com.mvk", packagePath = ""))
public class EmployeeEndpoint {

	@SuppressWarnings({ "unchecked", "unused" })
	@ApiMethod(name = "listEmployee")
	public CollectionResponse<Employee> listEmployee(
			@Nullable @Named("cursor") String cursorString,
			@Nullable @Named("limit") Integer limit) {

		PersistenceManager mgr = null;
		Cursor cursor = null;
		List<Employee> execute = null;

		try {
			mgr = getPersistenceManager();
			Query query = mgr.newQuery(Employee.class);
			if (cursorString != null && cursorString != "") {
				cursor = Cursor.fromWebSafeString(cursorString);
				HashMap<String, Object> extensionMap = new HashMap<String, Object>();
				extensionMap.put(JDOCursorHelper.CURSOR_EXTENSION, cursor);
				query.setExtensions(extensionMap);
			}

			if (limit != null) {
				query.setRange(0, limit);
			}

			execute = (List<Employee>) query.execute();
			cursor = JDOCursorHelper.getCursor(execute);
			if (cursor != null)
				cursorString = cursor.toWebSafeString();

			// Tight loop for fetching all entities from datastore and accomodate
			// for lazy fetch.
			for (Employee obj : execute)
				;
		} finally {
			mgr.close();
		}

		return CollectionResponse.<Employee> builder().setItems(execute)
				.setNextPageToken(cursorString).build();
	}

	@ApiMethod(name = "getEmployee")
	public Employee getEmployee(@Named("email") String email) {
		PersistenceManager mgr = getPersistenceManager();
		Employee employee = null;
		try {
			employee = mgr.getObjectById(Employee.class, email);
		} finally {
			mgr.close();
		}
		return employee;
	}

	@ApiMethod(name = "insertEmployee")
	public Employee insertEmployee(
			@Named("firstName") String firstName,
			@Named("lastName") String lastName,
			@Named("phoneNumber") String phoneNumber,
			@Named("cellNumber") String cellNumber,
			@Named("email") String email,
			@Named("idNumber") String idNumber,
			@Named("country") String country,
			@Named("city") String city ) {
		
		PersistenceManager mgr = getPersistenceManager();
		
		Employee employee = new Employee(firstName, lastName, phoneNumber, cellNumber, email, idNumber, country, city);
		
		try {
			if (containsEmployee(employee)) {
				throw new EntityExistsException("Object already exists");
			}
			
			mgr.makePersistent(employee);
		} finally {
			mgr.close();
		}
		return employee;
	}

	@ApiMethod(name = "updateEmployee")
	public Employee updateEmployee(
			@Named("firstName") String firstName,
			@Named("lastName") String lastName,
			@Named("phoneNumber") String phoneNumber,
			@Named("cellNumber") String cellNumber,
			@Named("email") String email,
			@Named("idNumber") String idNumber,
			@Named("country") String country,
			@Named("city") String city ) {
		
		PersistenceManager mgr = getPersistenceManager();
		
		Employee employee = new Employee(firstName, lastName, phoneNumber, cellNumber, email, idNumber, country, city);
		
		try {
			if (!containsEmployee(employee)) {
				throw new EntityNotFoundException("Object does not exist");
			}
			mgr.makePersistent(employee);
		} finally {
			mgr.close();
		}
		return employee;
	}

	@ApiMethod(name = "removeEmployee")
	public void removeEmployee(@Named("email") String email) {
		PersistenceManager mgr = getPersistenceManager();
		try {
			Employee employee = mgr.getObjectById(Employee.class, email);
			mgr.deletePersistent(employee);
		} finally {
			mgr.close();
		}
	}

	private boolean containsEmployee(Employee employee) {
		PersistenceManager mgr = getPersistenceManager();
		boolean contains = true;
		try {
			mgr.getObjectById(Employee.class, employee.getKey());
		} catch (javax.jdo.JDOObjectNotFoundException ex) {
			contains = false;
		} finally {
			mgr.close();
		}
		return contains;
	}

	private static PersistenceManager getPersistenceManager() {
		return PMF.get().getPersistenceManager();
	}

}
