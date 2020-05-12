import React, { useState, useEffect } from 'react';

import { RouteComponentProps } from 'react-router-dom'; // give us 'history' object

import { getUserSettings, updateUserSettings, getUserProfile, updateUserProfile } from '../../../services/user';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import BigInput from 'shared/components/BigInput/BigInput';
import LinkedAccountManagement from './components/LinkedAccountManagement/LinkedAccountManagement';

import './SettingsView.css';
import ChangeAccountTypeAlert from './components/ChangeAccountTypeAlert';
import CredentialsWrapper from 'shared/components/CredentialsWrapper';
import Row from 'shared/components/Row/Row';
import Column from 'shared/components/Column/Column';
import Child from 'shared/components/Child/Child';
import CredentialsForm from 'shared/components/CredentialsForm/CredentialsForm';

interface ISettingsView extends RouteComponentProps<any>{
  setIsLoading: (loading: boolean) => void;
}

const SettingsView: React.FC<ISettingsView> = ({ history, setIsLoading }) => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [userID, setUserID] = useState("");
  const [changeAccountTypeAlertOpen, setChangeAccountTypeAlertOpen] = useState<boolean>(false);

  const [error, setErrors] = useState("");
  const [invalidName, setInvalidName] = useState(false);

  const updateDisplayName = (e: any) => {
    setDisplayName(e.target.value);
  }

  const updateEmail = (e: any) => {
    setEmail(e.target.value);
  }

  const openRoleModal = () => {
    setChangeAccountTypeAlertOpen(true);
  }

  const handleChangeAccountTypeAlertClose = () => {
    setChangeAccountTypeAlertOpen(false);
  }

  const changeRole = (newRole: string) => {
    setRole(newRole);
    setChangeAccountTypeAlertOpen(false);
  }

  const displayNameInput = () => (
    <BigInput 
      error={invalidName}
      labelText="Display Name"
      name="displayName"
      required={true} 
      value={displayName}
      autoFocus={false}
      autoComplete="none"
      type="text"
      onChange={updateDisplayName}/>
  )

  const emailInput = () => (
    <BigInput
      error={false} 
      labelText="E-mail address"
      name="email"
      required={true} 
      value={email}
      autoFocus={false}
      autoComplete="none"
      type="email"
      onChange={updateEmail}/>
  )

  /* UPDATE ACCOUNT SETTINGS */
  const handleForm = async (e: any) => {
    e.preventDefault();

    if (displayName === "") {
      setErrors("Please enter a name.");
      setInvalidName(true);
    } else if (displayName.length > 34) {
      // 34 character test name with spaces: Priscilla Jacqueline Flarblesworth
      setErrors("Please enter a shorter name.");
      setInvalidName(true);
    } else {
      try {
        let updateProfileDone = await updateUserProfile(displayName, email);
        let updateSettingsDone = await updateUserSettings({role, displayName, email});

        if (updateProfileDone && updateSettingsDone) {
          if (history) history.push('/posts');
        }
      } catch(e) {
        setErrors(e.message);
      }
    }
  }

  /* GET USER's PROFILE AND SETTINGS */
  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    getUserSettings()
      .then((settings:any) => {
        if (isMounted) {
          setRole(settings.role);
          setDisplayName(settings?.displayName);
          setEmail(settings?.email);
          
          getUserProfile()
          .then((userProfile: any) => {
            setUserID(userProfile?.uid);

            setIsLoading(false);
          });
      }
    });
    return () => { isMounted = false; }
  }, [setIsLoading]); // fires on page load if this is empty [] 

  return (
    <CredentialsWrapper>

      <Row justify="space-around">
    
        {/* LEFT CHILD: ACCOUNT SETTINGS */}
        <Child xs={12} sm={10} md={5}>
          <Column justify="space-between">
            
            <span className="boldText">
              Account settings
            </span>

            <Child item xs={12}>
              <Typography>Account type: {role.toString()} 
                <Button 
                  variant="outlined" 
                  size="small" 
                  color="primary" 
                  className="pullRight" 
                  onClick={() => openRoleModal()}>Change</Button>
                </Typography>
            </Child>

            <CredentialsForm onSubmit={handleForm} submitText="Save settings" error={error}>

              <Child xs={12}>
                {displayNameInput()}
              </Child>

              <Child item xs={12}>
                {emailInput()}
              </Child>

            </CredentialsForm>
            <br/>
          </Column>
        </Child>

        {/* RIGHT CHILD: LINKED ACCOUNTS */}
        <Child xs={12} sm={10} md={6}>
          <LinkedAccountManagement role={role} />
        </Child>
      </Row>

      <p>User ID: {userID}</p>

    <ChangeAccountTypeAlert 
      isOpen={changeAccountTypeAlertOpen} 
      role={role} 
      changeRole={changeRole}
      onClose={handleChangeAccountTypeAlertClose} 
    />

  </CredentialsWrapper>
  )
}

export default SettingsView;
