import { useState } from 'react'
import Image from 'next/image'
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

export default function NutriAxisEMR() {
  const [patients, setPatients] = useState([])
  const [newPatient, setNewPatient] = useState({ name: '', age: '', diagnosis: '', bmi: '', bloodPressure: '', sugarLevel: '' })

  const addPatient = () => {
    if (!newPatient.name) return
    setPatients([...patients, { ...newPatient, id: Date.now() }])
    setNewPatient({ name: '', age: '', diagnosis: '', bmi: '', bloodPressure: '', sugarLevel: '' })
  }

  const interpretBMI = (bmi) => {
    const value = parseFloat(bmi)
    if (value < 18.5) return 'Underweight'
    if (value < 25) return 'Normal'
    if (value < 30) return 'Overweight'
    return 'Obese'
  }

  const interpretBP = (bp) => {
    const [systolic, diastolic] = bp.split('/').map(Number)
    if (systolic < 120 && diastolic < 80) return 'Normal'
    if (systolic < 130 && diastolic < 80) return 'Elevated'
    if (systolic < 140 || diastolic < 90) return 'Stage 1 Hypertension'
    return 'Stage 2 Hypertension'
  }

  const interpretSugar = (sugar) => {
    const value = parseFloat(sugar)
    if (value < 5.6) return 'Normal'
    if (value < 7) return 'Prediabetes'
    return 'Diabetes'
  }

  return (
    <main className="p-6">
      <div className="flex items-center gap-4 mb-4">
        <Image src="/logo.jpg" alt="NutriAxis Logo" width={60} height={60} />
        <h1 className="text-2xl font-bold">NutriAxis EMR System</h1>
      </div>

      <Tabs defaultValue="add" className="w-full">
        <TabsList>
          <TabsTrigger value="add">Add Patient</TabsTrigger>
          <TabsTrigger value="view">View Patients</TabsTrigger>
        </TabsList>

        <TabsContent value="add">
          <Card className="max-w-md">
            <CardContent className="space-y-4 p-4">
              <Input
                placeholder="Patient Name"
                value={newPatient.name}
                onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
              />
              <Input
                placeholder="Age"
                value={newPatient.age}
                onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })}
              />
              <Input
                placeholder="Diagnosis"
                value={newPatient.diagnosis}
                onChange={(e) => setNewPatient({ ...newPatient, diagnosis: e.target.value })}
              />
              <Input
                placeholder="BMI"
                value={newPatient.bmi}
                onChange={(e) => setNewPatient({ ...newPatient, bmi: e.target.value })}
              />
              <Input
                placeholder="Blood Pressure (e.g., 120/80)"
                value={newPatient.bloodPressure}
                onChange={(e) => setNewPatient({ ...newPatient, bloodPressure: e.target.value })}
              />
              <Input
                placeholder="Fasting Sugar Level (mmol/L)"
                value={newPatient.sugarLevel}
                onChange={(e) => setNewPatient({ ...newPatient, sugarLevel: e.target.value })}
              />
              <Button onClick={addPatient}>Save Patient</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="view">
          <div className="space-y-4">
            {patients.length === 0 ? (
              <p className="text-muted-foreground">No patients added yet.</p>
            ) : (
              patients.map((p) => (
                <Card key={p.id}>
                  <CardContent className="p-4">
                    <p><strong>Name:</strong> {p.name}</p>
                    <p><strong>Age:</strong> {p.age}</p>
                    <p><strong>Diagnosis:</strong> {p.diagnosis}</p>
                    <p><strong>BMI:</strong> {p.bmi} ({interpretBMI(p.bmi)})</p>
                    <p><strong>Blood Pressure:</strong> {p.bloodPressure} ({interpretBP(p.bloodPressure)})</p>
                    <p><strong>Fasting Sugar:</strong> {p.sugarLevel} mmol/L ({interpretSugar(p.sugarLevel)})</p>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </main>
  )
}
