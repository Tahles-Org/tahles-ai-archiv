-- Allow public read access to providers table for system status checks
DROP POLICY IF EXISTS "Allow access to providers for authenticated users" ON providers;
DROP POLICY IF EXISTS "Select providers for authenticated users" ON providers;
DROP POLICY IF EXISTS "Insert providers for authenticated users" ON providers;
DROP POLICY IF EXISTS "Update providers for authenticated users" ON providers;
DROP POLICY IF EXISTS "Delete providers for authenticated users" ON providers;

-- Create new policies
CREATE POLICY "Allow public read access to providers" 
ON providers 
FOR SELECT 
USING (true);

CREATE POLICY "Insert providers for authenticated users" 
ON providers 
FOR INSERT 
WITH CHECK (auth.role() = 'authenticated'::text);

CREATE POLICY "Update providers for authenticated users" 
ON providers 
FOR UPDATE 
USING (auth.role() = 'authenticated'::text);

CREATE POLICY "Delete providers for authenticated users" 
ON providers 
FOR DELETE 
USING (auth.role() = 'authenticated'::text);