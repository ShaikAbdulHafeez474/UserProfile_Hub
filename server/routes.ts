import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";
import { updateProfileSchema } from "@shared/schema";

export function registerRoutes(app: Express): Server {
  setupAuth(app);

  app.patch("/api/profile", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    
    try {
      const data = updateProfileSchema.parse(req.body);
      const updatedUser = await storage.updateProfile(req.user!.id, data);
      res.json(updatedUser);
    } catch (error) {
      res.status(400).json({ error: "Invalid profile data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
