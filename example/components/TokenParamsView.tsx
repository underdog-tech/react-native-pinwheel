/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Button,
  Keyboard,
  SafeAreaView,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import FieldView from './FieldView';
import type {TokenParams} from '../types';

type Props = {
  onSubmit: (params: TokenParams) => void;
};

const TokenParamsView: React.FC<Props> = ({onSubmit}) => {
  const [account_number, setAccountNumber] = useState('304119574487');
  const [account_type, setAccountType] = useState('checking');
  const [job, setJob] = useState('direct_deposit_switch');
  const [mode, setMode] = useState('sandbox');
  const [org_name, setOrgName] = useState('Iron Bank of Braavos');
  const [routing_number, setRoutingNumber] = useState('091302966');
  const [skip_exit_survey, setSkipExitSurvey] = useState('false');
  const [skip_intro_screen, setSkipIntroScreen] = useState('false');

  return (
    <SafeAreaView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{paddingTop: 48, flex: 1, justifyContent: 'flex-end'}}>
          <FieldView
            label={'account_view'}
            value={account_number}
            onChange={setAccountNumber}
          />
          <FieldView
            label={'account_type'}
            value={account_type}
            onChange={setAccountType}
          />
          <FieldView label={'job'} value={job} onChange={setJob} />
          <FieldView label={'mode'} value={mode} onChange={setMode} />
          <FieldView
            label={'org_name'}
            value={org_name}
            onChange={setOrgName}
          />
          <FieldView
            label={'routing_number'}
            value={routing_number}
            onChange={setRoutingNumber}
          />
          <FieldView
            label={'skip_exit_survey'}
            value={skip_exit_survey}
            onChange={setSkipExitSurvey}
          />
          <FieldView
            label={'skip_intro_screen'}
            value={skip_intro_screen}
            onChange={setSkipIntroScreen}
          />
          <Button
            title={'Fetch Token'}
            onPress={() =>
              onSubmit({
                account_number,
                account_type,
                job,
                mode,
                org_name,
                routing_number,
                skip_exit_survey: skip_exit_survey.toLowerCase() === 'true',
                skip_intro_screen: skip_intro_screen.toLowerCase() === 'true',
              })
            }
          />
          <View style={{flex: 1}} />
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default TokenParamsView;
