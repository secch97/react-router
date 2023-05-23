import React from "react";
import { Outlet, NavLink, useLoaderData, useNavigation, Form, redirect } from "react-router-dom";
import { getContacts, createContact } from "../contacts.js";

const loader = async () => {
  const contacts = await getContacts();
  console.log({ contacts });
  return { contacts };
};

const action = async () => {
    const contact = await createContact();
    return redirect(`/contacts/${contact.id}/edit`);
}

const Root = () => {
  const { contacts } = useLoaderData();
  const navigation = useNavigation();
  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts: </h1>
        <div>
          <form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
            />
            <div id="search-spinner" aria-hidden hidden={true} />
            <div className="sr-only" aria-live="polite"></div>
          </form>
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <nav>
          {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <NavLink 
                    to={`contacts/${contact.id}`}
                    className={({isActive, isPending}) => {
                      return isActive ? "active" : isPending ? "pending" : ""
                    }}  
                  >
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{" "}
                    {contact.favorite && <span>★</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>
      </div>
      <div 
        id="detail"
        className={navigation.state === "loading" ? "loading" : ""}
      >
        <Outlet></Outlet>
      </div>
    </>
  );
};

export { Root as default, loader, action };
