package com.mvk.openui5;

import java.util.List;

import javax.jdo.annotations.Embedded;	
import javax.jdo.annotations.IdGeneratorStrategy;
import javax.jdo.annotations.IdentityType;
import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;
import javax.jdo.annotations.PrimaryKey;

import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;

@PersistenceCapable(identityType = IdentityType.APPLICATION, detachable = "true")
public class Employee {

	@PrimaryKey
	@Persistent(valueStrategy = IdGeneratorStrategy.IDENTITY)
	private Key key;
	
	@Persistent
	private String firstName;
	
	@Persistent
	private String lastName;
	
	@Persistent
	private String phoneNumber;
	
	@Persistent
	private String cellNumber;
	
	@Persistent
	private String email;
	
	@Persistent
	private String idNumber;
	
	@Persistent
	private String country;
	
	@Persistent
	private String city;
	
	public Employee(String firstName, String lastName, String phoneNumber, String cellNumber, String email, String idNumber, String country, String city) {
		this.key = KeyFactory.createKey(Employee.class.getSimpleName(), email);
		
		this.firstName   = firstName;
		this.lastName    = lastName;
		this.phoneNumber = phoneNumber;
		this.cellNumber  = cellNumber;
		this.email       = email;
		this.idNumber    = idNumber;
		this.country     = country;
		this.city        = city;
	}

	public Key getKey() {
		return key;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public String getCellNumber() {
		return cellNumber;
	}

	public void setCellNumber(String cellNumber) {
		this.cellNumber = cellNumber;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getIdNumber() {
		return idNumber;
	}

	public void setIdNumber(String idNumber) {
		this.idNumber = idNumber;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

}
