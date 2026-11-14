import VolunteersConsole from "./VolunteersConsole";
import PartnersConsole from "./PartnersConsole";
import ProgrammesConsole from "./ProgrammesConsole";
import GovernanceConsole from "./GovernanceConsole";
import CommunicationsConsole from "./CommunicationsConsole";
import SystemHealthConsole from "./SystemHealthConsole";
import MembersManager from "../MembersManager";

export function MembershipModule() {
  return <MembersManager />;
}

export function VolunteersModule() {
  return <VolunteersConsole />;
}

export function PartnersModule() {
  return <PartnersConsole />;
}

export function ProgrammesModule() {
  return <ProgrammesConsole />;
}

export function CommunityModule() {
  return <MembersManager />;
}

export function GovernanceModule() {
  return <GovernanceConsole />;
}

export function CommunicationsModule() {
  return <CommunicationsConsole />;
}

export function SystemHealthModule() {
  return <SystemHealthConsole />;
}
