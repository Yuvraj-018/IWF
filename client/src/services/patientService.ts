import { useState, useEffect } from "react";
import { apiRequest } from "./apiClient";
import { URGENT_PATIENTS } from "@/content/patients";
import type { Patient } from "@/content/patients";

export interface PatientListResponse {
  success: boolean;
  count: number;
  data: Patient[];
}

export interface SinglePatientResponse {
  success: boolean;
  patient: Patient;
}

/**
 * Fetch patient cases from backend API with fallback to static urgent patients
 */
export async function fetchPatients(urgent?: boolean): Promise<Patient[]> {
  try {
    const query = urgent !== undefined ? `?urgent=${urgent}` : "";
    const res = await apiRequest<PatientListResponse>(`/patients${query}`);
    if (res && res.success && Array.isArray(res.data)) {
      return res.data;
    }
    return [];
  } catch (error) {
    console.warn("Could not fetch patients from backend API:", error);
    return [];
  }
}

/**
 * Fetch a single patient case by slug from backend API
 */
export async function fetchPatientBySlug(slug: string): Promise<Patient | null> {
  try {
    const res = await apiRequest<SinglePatientResponse>(`/patients/${encodeURIComponent(slug)}`);
    if (res && res.success && res.patient) {
      return res.patient;
    }
  } catch (error) {
    console.warn(`Could not fetch patient '${slug}' from backend:`, error);
  }
  return null;
}

/**
 * React hook to fetch urgent patients with loading and error states
 */
export function usePatients(urgent = true) {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetchPatients(urgent)
      .then((data) => {
        if (!isMounted) return;
        setPatients(data);
        setLoading(false);
      })
      .catch((err) => {
        if (!isMounted) return;
        setError(err.message || "Failed to load patient cases");
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [urgent]);

  return { patients, loading, error };
}

/**
 * React hook to fetch a single patient case by slug
 */
export function usePatient(slug: string) {
  const [patient, setPatient] = useState<Patient | null>(
    () => URGENT_PATIENTS.find((p) => p.slug === slug) || null
  );
  const [loading, setLoading] = useState<boolean>(!patient);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    fetchPatientBySlug(slug)
      .then((data) => {
        if (!isMounted) return;
        setPatient(data);
        setLoading(false);
      })
      .catch((err) => {
        if (!isMounted) return;
        setError(err.message || "Failed to load patient details");
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [slug]);

  return { patient, loading, error };
}
