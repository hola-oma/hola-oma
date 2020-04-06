import React, { useState, useEffect } from 'react';

import { roles } from '../../enums/enums';

import { RouteComponentProps } from 'react-router-dom'; // give us 'history' object

import { getUserSettings, updateUserSettings, getUserProfile, updateUserProfile } from '../../services/user';

interface ISettingsView extends RouteComponentProps<any>{
}

const SettingsView: React.FC<ISettingsView> = ({ history }) => {

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const [error, setErrors] = useState("");

  /* UPDATE ACCOUNT SETTINGS */
  const handleForm = async (e: any) => {
    e.preventDefault();
    
    try {
      let updateProfileDone = await updateUserProfile(displayName, email);
      let updateSettingsDone = await updateUserSettings({role});

      if (updateProfileDone && updateSettingsDone) {
        if (history) history.push('/posts');
      }
    } catch(e) {
      setErrors(e.message);
    }
  }

  /* GET USER's PROFILE AND SETTINGS */
  useEffect(() => {
    getUserSettings()
      .then((settings:any) => {
        setRole(settings.role);
      });

    getUserProfile()
      .then((userProfile: any) => {
        setDisplayName(userProfile.displayName);
        setEmail(userProfile.email);
      })
  }, []); // fires on page load if this is empty [] 

  return (
    <div>
      <h2>Account Settings</h2>
      <form onSubmit={e => handleForm(e)}>
        Display Name
        <input
          value={displayName? displayName : ''}
          onChange={e => setDisplayName(e.target.value)}
          name="displayName"
          type="displayName"
        />
        <br/>

        Email address
        <input
          value={email? email : ''}
          onChange={e => setEmail(e.target.value)}
          name="email"
          type="email"
          placeholder="email"
        />
        <br/>

        <h2>Role [be careful changing this!]</h2>
        <label>
        <input
          type="radio"
          name="accountType"
          id="receiver"
          value="receiver"
          checked={role === roles.receiver}
          onChange={e => setRole(roles.receiver)}
          />
          <b>Receive</b> posts
        </label>
        <br/>
        <label>
          <input
            type="radio"
            name="accountType"
            id="poster"
            value="poster"
            checked={role === roles.poster}
            onChange={e => setRole(roles.poster)}
            />
           <b>Make</b> posts
        </label>

      <br />
      <button type="submit">Update settings</button>
      
      </form>
    </div>
  )
}

export default SettingsView;